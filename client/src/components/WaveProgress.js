import { WaterWave } from 'ant-design-pro/lib/Charts';

const WaveProgress = (props) => {
    <div style={{ textAlign: 'center' }}>
    <WaterWave
      height={161}
      title="Generation Progress"
      percent={props.progress}
    />
  </div>
}

export default WaveProgress;