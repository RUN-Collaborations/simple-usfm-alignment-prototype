import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { styles } from './UsfmFileEditor.styles';

import { useProskomma } from 'proskomma-react-hooks';

import useAlignmentAdapter from './alignment/alignmentAdapters/useAlignmentAdapter';

export default function AnchorAlignmentEditor ({
  reference,
  onReference,
  files,
}) {
  if (files) alert(JSON.stringify(files));
  const documents = files && [
    {
      selectors: {
        org: 'unfoldingWord',
        lang: 'el-x-koine',
        abbr: 'ugnt',
      },
      bookId: 'tit',
      data: files[0]?.content
    },
    {
      selectors: {
        org: 'unfoldingWord',
        lang: 'en',
        abbr: 'ult',
      },
      bookId: 'tit',
      data: files[0]?.content
    },
    {
      selectors: {
        org: 'Door43-Catalog',
        lang: 'id',
        abbr: 'ayt',
      },
      bookId: 'tit',
      data: files[0]?.content
    }
  ];
  
  const {proskomma, stateId} = useProskomma({ documents });
  const {state} = useAlignmentAdapter({proskomma, reference, stateId});

  const anchorAlignmentComponent = useMemo(() => {
      return (
        // Strange state issues if we START with null props.
        // TODO: esp investigate referenceLinks.
        state && state.referenceLinks && state.referenceLinks.length > 0
        && <AnchorAlignmentEditor
        sourceGlosses={
          state.sourceGlosses
          //null
        }
        sourceSegments={
          state.sourceSegments
          //[{"text":"Παῦλος"},{"text":"δοῦλος"},{"text":"Θεοῦ"},{"text":"ἀπόστολος"},{"text":"δὲ"},{"text":"Ἰησοῦ"},{"text":"Χριστοῦ"},{"text":"κατὰ"},{"text":"πίστιν"},{"text":"ἐκλεκτῶν"},{"text":"Θεοῦ"},{"text":"καὶ"},{"text":"ἐπίγνωσιν"},{"text":"ἀληθείας"},{"text":"τῆς"},{"text":"κατ"},{"text":"εὐσέβειαν"}]
        }

        referenceSegments={
          state.referenceSegments
          //[{"text":"Paul"},{"text":"a"},{"text":"servant"},{"text":"of"},{"text":"God"},{"text":"and"},{"text":"an"},{"text":"apostle"},{"text":"of"},{"text":"Jesus"},{"text":"Christ"},{"text":"for"},{"text":"the"},{"text":"faith"},{"text":"of"},{"text":"the"},{"text":"chosen"},{"text":"people"},{"text":"of"},{"text":"God"},{"text":"and"},{"text":"the"},{"text":"knowledge"},{"text":"of"},{"text":"the"},{"text":"truth"},{"text":"that"},{"text":"agrees"},{"text":"with"},{"text":"godliness"}]
        }
        referenceLinks={
          state.referenceLinks
          //[{"sources":[0],"targets":[0],"type":"manual"},{"sources":[1],"targets":[1,2],"type":"manual"},{"sources":[2],"targets":[3,4],"type":"manual"},{"sources":[3],"targets":[6,7],"type":"manual"},{"sources":[4],"targets":[5],"type":"manual"},{"sources":[5],"targets":[8,9],"type":"manual"},{"sources":[6],"targets":[10],"type":"manual"},{"sources":[7],"targets":[11],"type":"manual"},{"sources":[8],"targets":[12,13],"type":"manual"},{"sources":[9],"targets":[14,15,16,17],"type":"manual"},{"sources":[10],"targets":[18,19],"type":"manual"},{"sources":[11],"targets":[20],"type":"manual"},{"sources":[12],"targets":[21,22],"type":"manual"},{"sources":[13],"targets":[23,24,25],"type":"manual"},{"sources":[14],"targets":[26],"type":"manual"},{"sources":[15],"targets":[27,28],"type":"manual"},{"sources":[16],"targets":[29],"type":"manual"}]
        }

        targetSegments={
          state.targetSegments
          //[{"text":"Павел"},{"text":"раб"},{"text":"Бога"},{"text":"апостол"},{"text":"же"},{"text":"Иисуса"},{"text":"Христа"},{"text":"по"},{"text":"вере"},{"text":"избранных"},{"text":"Бога"},{"text":"и"},{"text":"познанию"},{"text":"истины"},{"text":"согласно"},{"text":"благочестию"}]
        }
        userLinks={
          //state.userLinks
          null
        }

        //stateUpdatedHook={onState}
      />
    )
  }, [stateId]);

  return (
    <div style={styles.textFileEditor}>
      {anchorAlignmentComponent}
    </div>
  );
};

AnchorAlignmentEditor.propTypes = {
  /** Reference: { bookId, chapter, verse } */
  reference: PropTypes.object.isRequired,
  /** Function to update reference */
  onReference: PropTypes.func.isRequired,
};

AnchorAlignmentEditor.defaultProps = {
};