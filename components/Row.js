import Square from './Square';
import Mine from './Mine';
import Flag from './Flag';

const Row = ({ row, open, status, openAsFlag }) => {
  return row.map(square => 
    <Square 
      key={`${square.x},${square.y}`} 
      onClick={() => open(square)}
      onContextMenu={e => {
        e.preventDefault();
        openAsFlag(square);
      }}
      disabled={square.isOpen}
    > 
      <SquareData square={square} status={status} />
    </Square>
  );
};

export default Row;

const SquareData = ({ square, status}) => {
  if (status === 'lost') {
    return (
      <div>
        {square.hasMine && <Mine />}
        {square.count && !square.hasMine ? square.count : null}
      </div>
    );
  }

  if (square.hasMine && square.isOpen) {
    return <Mine />
  }

  if (square.hasFlag) {
    return <Flag />
  }

  if (square.count && !square.hasMine) {
    return square.count;
  }

  return null;
}