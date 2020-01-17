import {
  KEY_ACCESSOR,
  KEY_ID,
  KEY_METADATA,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import { rxSelectPath } from '@acoustic-content-sdk/utils';

const ACCESSOR_PATH = [KEY_METADATA, KEY_ACCESSOR];
const ID_PATH = [KEY_METADATA, KEY_ID];

const opSelectAccessor = rxSelectPath<RenderingContextV2, string>(
  ACCESSOR_PATH
);

const opSelectId = rxSelectPath<RenderingContextV2, string>(ID_PATH);

export const selectAccessor = () => opSelectAccessor;
export const selectId = () => opSelectId;
