/**
 *
 * HomePage
 *
 */

import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { saveAccountData } from './actions';
import { useToast, immediateToast } from 'izitoast-react';
import 'izitoast-react/dist/iziToast.css';

export function HomePage({ saveAccountData }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const [accountId, setAccountId] = useState(null);
  const [name, setName] = useState(null);

  return (
    <div
      className="w-screen h-screen"
      style={{
        background: `url("https://visualise.com/wp-content/uploads/2017/09/Metaverse-1020x620-c-default.png") no-repeat center center fixed`,
        backgroundSize: '100% 100%',
      }}
    >
      <h1 className="font-mono m-0 pt-10 text-white flex flex-row justify-center">
        Welcome to MySpace 3.0 - Metaverse on Hedera
      </h1>
      <div className="flex flex-col items-center justify-center h-1/2">
        <h2 className="font-mono m-0 pt-10 text-white flex flex-row justify-center font-bold text-xl">
          Enter your virtual home
        </h2>
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={accountId ? accountId : null}
          onChange={evt => setAccountId(evt.target.value)}
          placeholder="Enter your Hedera account id"
        />
        <input
          className="font-mono w-1/3 border border-gray-500 rounded-md px-2 py-1 my-2 text-xl"
          value={name ? name : null}
          onChange={evt => setName(evt.target.value)}
          placeholder="Enter your name"
        />
        <Link
          to={`${!name || !accountId ? '' : '/ugc'}`}
          onClick={() => {
            if (!name || !accountId) {
              immediateToast('error', {
                message: 'Name or account id cannot be empty',
                position: 'topRight',
                zindex: 50,
              });
            } else {
              saveAccountData({ name, accountId });
            }
          }}
          className="font-mono w-1/4 bg-purple-300 rounded-md px-2 py-1 my-2 text-xl text-center"
        >
          <button>
            <span>Brace yourself!</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    saveAccountData: op => dispatch(saveAccountData(op)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
