import { forwardRef, ReactElement, Ref } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router';

type LinkProps = Omit<ReactRouterLinkProps, 'to'> & {
  href: ReactRouterLinkProps['to'];
};

const Link = forwardRef(({ href, ...linkProps }: LinkProps, ref: Ref<HTMLAnchorElement>) => {
  return (
    <ReactRouterLink
      ref={ref}
      to={href}
      {...linkProps}
    />
  );
}) as (props: LinkProps & { ref?: Ref<HTMLAnchorElement> }) => ReactElement;

export { Link };
