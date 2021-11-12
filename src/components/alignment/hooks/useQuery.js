import { useState } from 'react';
import { useDeepCompareEffect } from 'use-deep-compare';

export default function useQuery({proskomma, changeIndex, query}) {
  const cleanState = {
    query,
    data: undefined,
    changeIndex: undefined,
    errors: [],
  };
  const [state, setState] = useState({ ...cleanState });

  useDeepCompareEffect(async () => {
    if (query && (state.changeIndex !== changeIndex || query !== state.query)) {
      console.log('run() changeIndex: ' + changeIndex);
      let data;
      let errors = [];
  
      try {
        const { errors: _errors, data: _data } = await proskomma.gqlQuery(query);
        // debugger
        errors = _errors;
        data = _data;
      } catch (error) {
        errors = [error];
      };

      setState({
        query,
        data,
        changeIndex,
        errors,
      });
    };
  }, [proskomma, query, changeIndex, state]);

  return {
    state,
    actions: {
    },
  };
};