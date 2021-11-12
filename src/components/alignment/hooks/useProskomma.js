// import { useState, useCallback } from 'react';
// import deepFreeze from 'deep-freeze';
// import { useDeepCompareEffect, useDeepCompareCallback, useDeepCompareMemo } from 'use-deep-compare';

// import UWProskomma from './core/uwProskomma';
// import {importResources} from './core/resources';


// export default function useProskomma ({
//   books,
//   resources,
//   config,
//   serialize,
// }) {
//   const [changeIndex, setChangeIndex] = useState(0);
//   const [manifests_, setManifests] = useState({});

//   const manifests = manifests_ && deepFreeze(manifests_);

//   const proskomma = useDeepCompareMemo(() => (new UWProskomma()), [books, resources]);  

//   const incrementChangeIndex = useCallback((length=7) => {
//     let result = [];
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
//     }
//     const _changeIndex = result.join('');
//     console.log('Increment changeIndex: ' + _changeIndex);
//     setChangeIndex(_changeIndex);
//   }, []);

//   const initialImport = useDeepCompareCallback(async () => {
//     let _manifests = {};
//     const onManifest = ({ resource: { owner, lang, abbr }, manifest }) => {
//       const resourceKey = `${owner}/${lang}_${abbr}`;
//       let _manifests = {...manifests};
//       _manifests[resourceKey] = manifest;
//       console.log(resourceKey, manifest);
//     };

//     const onImport = incrementChangeIndex;
//     await importResources({ proskomma, books, onManifest, onImport, config, resources, serialize })
//     .then(() => {
//       setManifests(_manifests);
//     });
//   }, [proskomma, books, resources, config, serialize]);

//   useDeepCompareEffect(() => {
//     initialImport();
//   }, [proskomma, books, resources, config]);

//   const runQuery = useDeepCompareCallback( async (query) => {
//     return await proskomma.gqlQuery(query);
//   }, [proskomma]);

//   return {
//     state: {
//       proskomma,
//       changeIndex,
//       books,
//       resources,
//       manifests,
//     },
//     actions: {
//       runQuery,
//     },
//   };

// };