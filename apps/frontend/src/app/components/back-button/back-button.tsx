import history from '@frontend/src/history';
import {FlatButton} from '@frontend/components';
import { Icon, IconPosition } from '@frontend/types/component';

interface BackButtonProps {
  className: string;
}

function BackButton({ className }: BackButtonProps): JSX.Element {
  return (
    <FlatButton
      className={className}
      icon={Icon.Back}
      iconPosition= {IconPosition.Left}
      onClick={() => history.back()}
    />
  );
}

export default BackButton;
