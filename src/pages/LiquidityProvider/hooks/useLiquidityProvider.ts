import create, { GetState, SetState, State } from '../../../store/createState';

export interface LiquidityProviderState extends State {
  setState: SetState<LiquidityProviderState>;
  liquidityType: 'margin' | 'swap';
}

export const [useLiquidityProvider, useLiquidityProviderApi, useLiquidityProviderSelector] = create<
  LiquidityProviderState
>(
  (set: SetState<LiquidityProviderState>, get: GetState<LiquidityProviderState>): LiquidityProviderState => ({
    setState: set,
    liquidityType: 'margin',
  }),
);

export default useLiquidityProvider;
