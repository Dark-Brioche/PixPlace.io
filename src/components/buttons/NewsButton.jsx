/**
 *
 */

import React from 'react';
import { MdOutlineNewspaper } from "react-icons/md";
import { t } from 'ttag';

import useLink from '../hooks/link';

const NewsButton = () => {
  const link = useLink();

  return (
    <div
      id="newsbutton"
      className="actionbuttons"
      onClick={() => link('NEWS', { target: 'fullscreen' })}
      role="button"
      title={t`Game News`}
      tabIndex={-1}
    >
      <MdOutlineNewspaper/>
    </div>
  );
};

export default React.memo(NewsButton);