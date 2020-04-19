import create, { GetState, SetState, State } from './createState';
import { OracleValue } from '../services/Api';

export interface OracleState extends State {
  data: OracleValue[];
  setOracleValues(values: OracleValue[]): void;
}

export const [useOracle, useOracleApi, useOracleSelector] = create<OracleState>(
  (set: SetState<OracleState>, get: GetState<OracleState>): OracleState => ({
    data: [],
    setOracleValues(values) {
      set(state => {
        state.data = values;
      });
    },
  }),
);

export default useOracle;
