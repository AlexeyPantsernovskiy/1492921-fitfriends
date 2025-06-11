import classNames from 'classnames';
import { JSX } from 'react';

export type HashtagProps<T extends Record<string, string>> = {
  tags: Array<keyof T>;
  dictionary: T;
  listClassName: string;
  itemClassName?: string;
  divClassName?: string;
};

const Hashtags = <T extends Record<string, string>>({
  tags,
  dictionary,
  listClassName,
  itemClassName,
  divClassName,
}: HashtagProps<T>): JSX.Element => (
  <ul className={listClassName}>
    {tags &&
      tags.map((item) => (
        <li key={String(item)} className={itemClassName || undefined}>
          <div className={classNames('hashtag', divClassName)}>
            <span>#{dictionary[item]}</span>
          </div>
        </li>
      ))}
  </ul>
);

export default Hashtags;
