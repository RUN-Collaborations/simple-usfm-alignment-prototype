import { useState, useCallback } from 'react';
import deepFreeze from 'deep-freeze';
import { useDeepCompareEffect, useDeepCompareCallback, useDeepCompareMemo } from 'use-deep-compare';

import {importResources} from '../core/resources';

export const CONFIG = {
  baseURL: 'https://git.door43.org/',
  verbose: true,
};
export const RESOURCES = [
  // { owner: 'unfoldingWord', lang: 'el-x-koine', abbr: 'ugnt' },
  { owner: 'unfoldingWord', lang: 'en', abbr: 'ult', tag: '25' },
  { owner: 'unfoldingWord', lang: 'en', abbr: 'ust', tag: '26' },
];

// store usfm file in indexedDB
  // unfoldingWord/en/ult/tag/25/tit.usfm
  // unfoldingWord/el-x-koine/ugnt/branch/master/tit.usfm
  // unknown/el-x-koine/na28/import/tit.usfm

export default function useResources ({
  books,
  resources,
  config,
}) {
  const [manifests_, setManifests] = useState({});

  const manifests = manifests_ && deepFreeze(manifests_);

  const initialImport = useDeepCompareCallback(async () => {
    let _manifests = {};
    const onManifest = ({ resource: { owner, lang, abbr }, manifest }) => {
      const resourceKey = `${owner}/${lang}_${abbr}`;
      let _manifests = {...manifests};
      _manifests[resourceKey] = manifest;
      console.log(resourceKey, manifest);
    };

    await importResources({ books, onManifest, config, resources, serialize })
    .then(() => {
      setManifests(_manifests);
    });
  }, [books, resources, config]);

  useDeepCompareEffect(() => {
    initialImport();
  }, [books, resources, config]);

  return {
    state: {
      books,
      resources,
      manifests,
    },
    actions: {
      runQuery,
    },
  };

};