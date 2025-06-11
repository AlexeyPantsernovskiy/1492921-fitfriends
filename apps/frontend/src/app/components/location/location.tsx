import { JSX } from 'react';

export type LocationProps = {
  address: string;
  baseClassName?: string;
};

const Location = ({
  address,
  baseClassName = 'user',
}: LocationProps): JSX.Element => (
  <div className={`thumbnail-${baseClassName}__location`}>
    <svg width="14" height="16" aria-hidden="true">
      <use xlinkHref="#icon-location"></use>
    </svg>
    <address className={`thumbnail-${baseClassName}__location-address`}>
      {address}
    </address>
  </div>
);

export default Location;
