import { useState } from 'react';

import UsfmFileEditor from './UsfmFileEditor';
import AnchorAlignmentEditor from './AnchorAlignmentEditor';
import { styles } from './Layout.styles';

function Layout() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [reference, setReference] = useState({ bookId: undefined, chapter: undefined, verse: undefined });

  const editorProps = {
    sectionIndex,
    onSectionIndex: setSectionIndex,
    reference,
    onReference: setReference,
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.upper}>
        <div style={styles.workspace}>
          <div style={styles.editor}>
            <UsfmFileEditor {...editorProps} editable={false} />
          </div>
          <div style={styles.editor}>
            <UsfmFileEditor {...editorProps} editable={false} />
          </div>
          <div style={styles.editor}>
            <UsfmFileEditor {...editorProps} />
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
