// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProduct POST /hatch4tech-biz/shop/product/add */
export async function addProductUsingPOST(
  body: API.ProductAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-biz/shop/product/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteProduct POST /hatch4tech-biz/shop/product/delete */
export async function deleteProductUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/hatch4tech-biz/shop/product/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getProductById GET /hatch4tech-biz/shop/product/get */
export async function getProductByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductVO_>('/hatch4tech-biz/shop/product/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageProduct POST /hatch4tech-biz/shop/product/page/vo */
export async function pageProductUsingPOST(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductVO_>('/hatch4tech-biz/shop/product/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateProduct POST /hatch4tech-biz/shop/product/update */
export async function updateProductUsingPOST(
  body: API.ProductUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/hatch4tech-biz/shop/product/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
