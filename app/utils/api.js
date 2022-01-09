async function getJSONOrThrow(response) {
  try {
    return await response.json();
  } catch (e) {
    throw new Error(
      'Something went wrong when parsing the response from the server.',
    );
  }
}

function cleanUrl(url) {
  if (url.indexOf('http') !== 0) {
    return `/${url}${
      url.indexOf('?') === -1 && url[url.length - 1] !== '/' ? '/' : ''
    }`;
  }

  return url;
}

class Api {
  async get(url) {
    const response = await fetch(cleanUrl(url));

    if (!response.ok) {
      const data = await getJSONOrThrow(response);
      // eslint-disable-next-line no-throw-literal
      throw { status: response.status, ...data };
    }
    // if (response.url.includes('api/logout')) {
    //   return { status: response.ok };
    // }
    const res = await getJSONOrThrow(response);
    return res;
  }

  async patch(url, data) {
    const isFormData = data instanceof FormData;
    const response = await fetch(cleanUrl(url), {
      method: 'PATCH',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        // 'X-CSRF-Token': getCookie('csrfToken'),
      },
      body: isFormData ? data : JSON.stringify(data),
    });
    if (!response.ok) {
      const responseData = await getJSONOrThrow(response);
      if (Array.isArray(responseData)) {
        throw responseData;
      }
      // eslint-disable-next-line no-throw-literal
      throw { status: response.status, ...responseData };
    }
    const res = await getJSONOrThrow(response);
    return res;
  }

  async post(url, data, opts) {
    const isFormData = data instanceof FormData;
    const response = await fetch(cleanUrl(url), {
      method: 'POST',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        // 'X-CSRF-Token': getCookie('csrfToken'),
      },
      body: isFormData ? data : JSON.stringify(data),
      ...(opts || {}),
    });
    if (!response.ok) {
      const responseData = await getJSONOrThrow(response);
      if (Array.isArray(responseData)) {
        throw responseData;
      }
      // eslint-disable-next-line no-throw-literal
      throw { status: response.status, ...responseData };
    }
    const res = await getJSONOrThrow(response);
    return res;
  }

  async delete(url) {
    const response = await fetch(cleanUrl(url), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'X-CSRF-Token': getCookie('csrfToken'),
      },
    });
    if (!response.ok) {
      const responseData = await getJSONOrThrow(response);
      if (Array.isArray(responseData)) {
        throw responseData;
      }
      // eslint-disable-next-line no-throw-literal
      throw { status: response.status, ...responseData };
    }
    return response;
  }
}

const api = new Api();

export default api;
