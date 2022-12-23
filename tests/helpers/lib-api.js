import url from 'url';

export const getParam = (param) => {
    const params = new url.URLSearchParams(param);
    return params;
}