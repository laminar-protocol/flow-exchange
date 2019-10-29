import { lifecycle } from 'recompose';

interface WithInitProps {
  init(): void;
  uninit?: () => void;
}

export const withInit = lifecycle<WithInitProps, {}>({
  componentDidMount() {
    this.props.init();
  },
  componentWillUnmount() {
    const { uninit } = this.props;
    if (uninit) {
      uninit();
    }
  },
});
