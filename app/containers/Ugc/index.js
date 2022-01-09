/**
 *
 * Ugc
 *
 */

import React, { memo, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ipfs from '../../utils/ipfs';
import api from '../../utils/api';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectAccountName,
  makeSelectAccountId,
  makeSelectAccountUuid,
  makeSelectAccountBalance,
} from '../HomePage/selectors';
import {
  fetchNftData,
  fetchNftDataUninitialize,
  mintNftData,
  mintNftDataUninitialize,
} from './actions';
import {
  makeSelectFetchData,
  makeSelectFetchStatus,
  makeSelectMintStatus,
} from './selectors';
import { useToast, immediateToast } from 'izitoast-react';
import 'izitoast-react/dist/iziToast.css';

export function Ugc({
  name,
  accountId,
  balance,
  uuid,
  fetchData,
  fetchStatus,
  mintStatus,
  fetchNftData,
  mintNftData,
  mintNftDataUninitialize,
}) {
  useInjectReducer({ key: 'ugc', reducer });
  useInjectSaga({ key: 'ugc', saga });

  useEffect(() => {
    if (mintStatus === 'inprogress') {
      immediateToast('info', {
        message: 'You will be notifed when minting is over',
        position: 'topRight',
        zindex: 50,
      });
    }
    if (mintStatus === 'success') {
      immediateToast('success', {
        message: 'Minting successful',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        mintNftDataUninitialize();
        setImage(null);
        setFileMetaData(null);
        setBuffer(null);
        setPvtKey(null);
      }, 3000);
    }
    if (mintStatus === 'error') {
      immediateToast('error', {
        message: 'Minting failed, please retry',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        mintNftDataUninitialize();
      }, 3000);
    }
  }, [mintStatus]);

  useEffect(() => {
    if (fetchStatus === 'error') {
      immediateToast('error', {
        message: 'Fetching failed, please refresh',
        position: 'topRight',
        zindex: 50,
      });
      setTimeout(() => {
        fetchNftDataUninitialize();
      }, 3000);
    }
  }, [fetchStatus]);

  const [nftData, setNftData] = useState([]);
  const [image, setImage] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [fileMetaData, setFileMetaData] = useState({});
  const [pvtkey, setPvtKey] = useState(null);
  const [transactions, setTransactions] = useState([
    {
      scheduleId: '0.0.9346352',
      token: '0.0.9364173',
      amt: '250 ℏ',
      verified: false,
    },
  ]);
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    fetchNftData({ accountId });
  }, []);

  useEffect(() => {
    if (mintStatus === 'success') {
      fetchNftData({ accountId });
    }
  }, [mintStatus]);

  useEffect(() => {
    (async () => {
      let allIpfsData = [];
      for (let i = 0; i < fetchData.length; i++) {
        let ipfsData = await api.get(
          `https://ipfs.infura.io/ipfs/${fetchData[i]}`,
        );
        allIpfsData.push(ipfsData);
      }
      setNftData(allIpfsData);
    })();
  }, [fetchData]);

  const onSelectFile = event => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      setFileMetaData(
        Object.assign({}, fileMetaData, {
          name: 'Hedera Metaverse Token',
          token: 'HDMETA',
          type: event.target.files[0].type,
        }),
      );
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        let image1 = new Image();
        image1.src = reader.result;
        image1.addEventListener('load', () => {
          setImage(reader.result);
        });
      });
      const reader1 = new FileReader();
      reader1.readAsArrayBuffer(event.target.files[0]);
      reader1.addEventListener('load', () => {
        setBuffer(Buffer(reader1.result));
      });
    }
    event.target.value = '';
  };

  const uploadFile = async event => {
    event.preventDefault();
    console.log('uploading');
    const added1 = await ipfs.add({
      content: buffer,
    });
    console.log('ipfs image data ', added1.path);
    const added2 = await ipfs.add({
      content: JSON.stringify({
        metadata: fileMetaData,
        CID: added1.path,
      }),
    });
    console.log('final ipfs data ', added2.path);
    mintNftData({ pvtkey, accountId, cid: added2.path });
  };

  const showNfts = () => {
    return nftData.length > 0 ? (
      <div className="grid grid-cols-3 gap-4">
        {nftData.map(el => (
          <div className="p-5 bg-white border border-white rounded-md flex flex-col items-center">
            <img
              className="w-48 h-48"
              src={`https://ipfs.infura.io/ipfs/${el.CID}`}
            />
            <span className="text-xs mt-4">Name: {el.metadata.name}</span>
            <span className="text-xs">
              Token: {el.metadata.token} #{el.metadata.qty}
            </span>
            <span className="text-xs">Price: {el.metadata.price}ℏ</span>
          </div>
        ))}
      </div>
    ) : null;
  };

  return (
    <div
      className="w-screen h-screen overflow-y-scroll"
      style={{ backgroundColor: '#f4eee4' }}
    >
      <h1 className="font-mono m-0 pt-10 flex flex-row justify-center">
        {`Hello ${name}`} (Your balance: {`${balance}`})
      </h1>
      <div className="flex flex-col items-center">
        <Link
          to={{
            pathname: `http://localhost:3001/${uuid}`,
          }}
          target="_blank"
          className="mt-10 font-mono w-1/4 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center"
        >
          <button>
            <span>Enter your metaverse 🚀 </span>
          </button>
        </Link>
        <div
          className="flex flex-row justify-between font-mono w-full h-screen mt-10"
          style={{ padding: '20px' }}
        >
          <div
            className="flex flex-col items-center h-screen overflow-y-scroll"
            style={{
              width: '50%',
              float: 'left',
              padding: '20px',
              borderRight: '2px dashed gray',
            }}
          >
            <span className="text-2xl font-bold my-5">Your NFTs</span>
            {(fetchData || []).length > 0 ? (
              <div>{showNfts()}</div>
            ) : (
              <span>You don't seem to have any NFTs</span>
            )}
          </div>
          <div
            className="flex flex-col items-center"
            style={{
              width: '50%',
              float: 'left',
              padding: '20px',
            }}
          >
            <span className="text-2xl font-bold my-5">Mint a NFT</span>
            <div
              className={`w-full ${
                image ? '' : 'flex flex-row justify-center'
              }`}
            >
              {image ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    className="rounded-sm w-48 h-48"
                    src={image}
                    alt="nft_upload_pic"
                  />
                  <input
                    id="nft_metadata_price"
                    name="nft_metadata_price"
                    type="text"
                    className="w-3/4 font-mono border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
                    value={fileMetaData.price || null}
                    placeholder="Enter NFT Base Price (in HBAR (ℏ))"
                    onChange={e => {
                      let newPrice = e.target.value;
                      setFileMetaData(prevState => {
                        return Object.assign({}, prevState, {
                          price: newPrice,
                        });
                      });
                    }}
                  />
                  <input
                    id="nft_metadata_pvtkey"
                    name="nft_metadata_pvtkey"
                    type="text"
                    className="w-3/4 font-mono border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
                    value={pvtkey || null}
                    placeholder="Enter your Hedera private key to mint"
                    onChange={e => {
                      let newkey = e.target.value;
                      setPvtKey(newkey);
                    }}
                  />

                  <button
                    className="mt-10 font-mono w-1/4 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center px-2 py-1"
                    onClick={uploadFile}
                  >
                    <span>Mint your NFT 🔥 </span>
                  </button>
                </div>
              ) : (
                <div
                  className="w-48 h-48 border border-gray-500 border-dashed rounded-md text-center flex flex-row justify-center items-center cursor-pointer"
                  onClick={handleClick}
                >
                  <span className="text-3xl">+</span>
                  <input
                    id="nft_upload"
                    name="nft_upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={e => {
                      onSelectFile(e);
                      e.target.value = null;
                    }}
                  />
                </div>
              )}
            </div>
            <span className="text-2xl font-bold my-5">
              Verify a scheduled Transaction
            </span>
            <div className="w-full">
              {transactions.map(el => {
                return (
                  <div className="flex flex-row justify-between px-10 py-8 border border-gray-500 mb-5">
                    <span>{`Schedule Id ${el.scheduleId}`}</span>
                    <input
                      id="nft_metadata_pvtkey"
                      name="nft_metadata_pvtkey"
                      type="text"
                      className="w-3/4 font-mono border border-gray-500 rounded-md px-2 py-1 my-2 text-md mx-2"
                      value={pvtkey || null}
                      placeholder="Enter your Hedera private key to mint"
                      onChange={e => {
                        let newkey = e.target.value;
                        setPvtKey(newkey);
                      }}
                    />
                    <button className="border border-green-500 bg-green-500 text-white font-bold px-2 py-1 rounded-md">
                      <span>{`Amount ${el.amt}`}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Ugc.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  name: makeSelectAccountName()(state),
  accountId: makeSelectAccountId()(state),
  uuid: makeSelectAccountUuid()(state),
  balance: makeSelectAccountBalance()(state),
  fetchData: makeSelectFetchData()(state),
  fetchStatus: makeSelectFetchStatus()(state),
  mintStatus: makeSelectMintStatus()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchNftData: op => dispatch(fetchNftData(op)),
    fetchNftDataUninitialize: op => dispatch(fetchNftDataUninitialize(op)),
    mintNftData: op => dispatch(mintNftData(op)),
    mintNftDataUninitialize: op => dispatch(mintNftDataUninitialize(op)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Ugc);
