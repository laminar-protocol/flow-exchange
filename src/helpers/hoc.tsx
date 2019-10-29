import { lifecycle, ComponentEnhancer } from 'recompose';

interface WithInitProps {
  init(): void;
  uninit?: () => void;
}

export const withInit: ComponentEnhancer<WithInitProps, WithInitProps> = lifecycle<WithInitProps, {}>({
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
