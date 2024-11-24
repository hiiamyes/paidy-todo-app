import React from 'react';

import {SizableText} from 'tamagui';

const Header = (): React.JSX.Element => {
  return (
    <SizableText size="$8" fontWeight="bold" color="$blue11Light" padding="$4">
      TODO:
    </SizableText>
  );
};

export default Header;
