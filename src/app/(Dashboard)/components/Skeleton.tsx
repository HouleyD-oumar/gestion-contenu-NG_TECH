const Skeleton = ({ width = '100%', height = '20px' }) => (
  <div
    className="skeleton"
    style={{ width, height, background: '#eee', borderRadius: '4px' }}
  />
);

export default Skeleton;