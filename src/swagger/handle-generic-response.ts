import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  getSchemaPath,
  ApiResponseSchemaHost,
  ApiResponseMetadata,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { BaseApiResponse } from 'src/utils/response/base';
import { ConstantResponse } from './type';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * @cc this is original source for this approach
 * 
 * @source : https://aalonso.dev/blog/2021/how-to-generate-generics-dtos-with-nestjsswagger-422g
 * 
 export const BaseResponseGenericDecoratorsArrayData = <T extends Type<unknown>>(
  dataDto: T,
  description?: string,
  status: number = 200,
  summary?: string,
) =>
  applyDecorators(
    ApiExtraModels(BaseApiResponse, dataDto),
    ApiOperation({ summary }),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseApiResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
      status,
      description,
    }),
  );
 */

export const BaseResponseGenericDecoratorsArrayData = <T extends Type<unknown>>(
  dataDto: T,
  stringResponse: ConstantResponse[],
  summary: string,
) => {
  const apiResponses = stringResponse.map((item) => {
    let properties: SchemaObject = {};

    if (item.status === 200 && item.type === 'success') {
      properties = {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(dataDto) },
          },
        },
      };
    } else {
      properties = {
        properties: {
          data: {
            example: null,
          },
          status: {
            example: false,
          },
          message: {
            example: item.desc,
          },
        },
      };
    }

    console.log(properties);
    return ApiResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(BaseApiResponse) }, properties],
      },
      status: item.status,
      description: item.desc,
    });
  });

  console.log();

  return applyDecorators(
    ApiExtraModels(BaseApiResponse, dataDto),
    ApiOperation({ summary }),
    ...apiResponses,
  );
};

export const BaseResponseGenericDecoratorsObjectData = <
  T extends Type<unknown>,
>(
  dataDto: T,
) => {
  applyDecorators(
    ApiExtraModels(BaseApiResponse, dataDto),
    ApiResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseApiResponse) },
          {
            properties: {
              data: { $ref: getSchemaPath(dataDto) },
            },
          },
        ],
      },
    }),
  );
};
