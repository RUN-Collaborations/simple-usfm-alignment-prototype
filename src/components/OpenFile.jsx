/* eslint-disable test-selectors/button, test-selectors/onClick */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useFilePicker } from 'use-file-picker';

export default function OpenFile({ onFile }) {
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: '.usfm', multiple: false, readAs: 'Text',
  });
  const openedFile = filesContent[0] || {};

  useEffect(() => {
    onFile({
      name: openedFile.name,
      content: openedFile.content,
      lastModified: openedFile.lastModified,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedFile.name, openedFile.content, openedFile.lastModified]);
  // exclude onFile to prevent infinite loop.

  return (
    <button type="button" className={(openedFile === filesContent[0] ? 'btnAll btnLeft on' : 'btnAll btnLeft')} onClick={openFileSelector}>Open</button>
  );
}

OpenFile.propTypes = {
  /** Function triggered on file open */
  onFile: PropTypes.func.isRequired,
};

OpenFile.defaultProps = {
  // component: (file) => {},
};
