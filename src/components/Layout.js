import { useState } from 'react';

import UsfmFileEditor from './UsfmFileEditor';
import AnchorAlignmentEditor from './AnchorAlignmentEditor';
import { styles } from './Layout.styles';

function Layout() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [reference, setReference] = useState({ bookId: undefined, chapter: undefined, verse: undefined });

  const initialFile = { name: undefined, content: undefined, lastModified: undefined };
  const initialFiles = { original: initialFile, bridge: initialFile, target: initialFile };
  const [files, setFiles] = useState(initialFiles);

  const onFile = ({file, type}) => {
    let _files = {...files};
    _files[type] = file;
    setFiles(_files);
  }

  const editorProps = {
    sectionIndex,
    onSectionIndex: setSectionIndex,
    reference,
    onReference: setReference,
    onFile,
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.upper}>
        <div style={styles.workspace}>
          <div style={styles.editor}>
            <UsfmFileEditor {...editorProps} editable={false} file={files.original} type={'original'} />
          </div>
          <div style={styles.editor}>
            <UsfmFileEditor {...editorProps} editable={false} file={files.bridge} type={'bridge'} />
          </div>
          <div style={styles.editor}>
            <UsfmFileEditor {...editorProps} file={files.target} type={'target'} />
          </div>
       </div>
      </div>
      <div style={styles.lower}>
        <hr />
        [Alignment Workspace]
        <hr />
        Reference: { JSON.stringify( reference ) }
        <AnchorAlignmentEditor/>
      </div>
    </div>
  );
};

export default Layout;
