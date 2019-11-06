import { lifecycle } from 'recompose';

interface WithInitProps {
  init(): void;
  deinit?: () => void;
}

export const withInit = lifecycle<WithInitProps, {}>({
  componentDidMount() {
    this.props.init();
  },
  componentWillUnmount() {
    const { deinit } = this.props;
    if (deinit) {
      deinit();
    }
  },
});
