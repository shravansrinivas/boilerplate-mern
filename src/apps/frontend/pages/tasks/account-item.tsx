import React from 'react';

import { HorizontalStackLayout, Input, ParagraphSmall } from '../../components';
import { Account } from '../../types';

interface AccountItemProps {
  account: Account;
  handleToggle: (userId: string) => void;
  selected: boolean;
}

const AccountItem: React.FC<AccountItemProps> = ({
  account,
  handleToggle,
  selected,
}) => {
  return (
    <HorizontalStackLayout gap={5}>
      <div>
        <Input
          error=""
          type="checkbox"
          borderDisabled={true}
          checked={selected}
          onChange={() => handleToggle(account.id)}
        />
      </div>
      <div>
        <ParagraphSmall>
          {account.displayName()} ({account.username})
        </ParagraphSmall>
      </div>
    </HorizontalStackLayout>
  );
};

export default AccountItem;
