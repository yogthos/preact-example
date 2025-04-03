import { create } from 'zustand';
import { useState, memo } from 'preact/compat'; // Use Preact's memo

// Zustand store with selector support
const useTableStore = create((set) => ({
  rows: [["foo", "bar", "baz"]],
  updateCell: (rowIndex, colIndex, value) => set(state => {
    const newRows = state.rows.map((row, rIdx) => 
      rIdx === rowIndex 
        ? row.map((cell, cIdx) => cIdx === colIndex ? value : cell)
        : row
    );
    return { rows: newRows };
  }),
  addRow: () => set(state => ({
    rows: [...state.rows, Array(state.rows[0]?.length || 1).fill('')]
  }))
}));

// Memoized Cell component
const Cell = memo(({ value, rowIndex, colIndex }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateCell = useTableStore(state => state.updateCell);

  const handleBlur = (e) => {
    updateCell(rowIndex, colIndex, e.target.value);
    setIsEditing(false);
  };

  return (
    <td
      className="is-clickable"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div class="field">
          <div class="control">
            <input
              class="input is-small"
              type="text"
              defaultValue={value}
              autoFocus
              onBlur={handleBlur}
              onKeyPress={(e) => e.key === 'Enter' && handleBlur(e)}
            />
          </div>
        </div>
      ) : (
        <span class="is-size-6">{value}</span>
      )}
    </td>
  );
}, (prev, next) => prev.value === next.value); // Only re-render if value changes

// Memoized Row component
const Row = memo(({ rowIndex }) => {
    console.log(`Rendering row ${rowIndex}`);
  const row = useTableStore(state => state.rows[rowIndex]);
  
  return (
    <tr class="is-vcentered">
      {row.map((cell, colIndex) => (
        <Cell
          key={colIndex}
          value={cell}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </tr>
  );
}, (prev, next) => prev.rowIndex === next.rowIndex); // Row index never changes

// Main table component
function OptimizedTable() {
  const rows = useTableStore(state => state.rows);
  const addRow = useTableStore(state => state.addRow);

  return (
    <div class="container mt-5">
      <div class="box">
        <div class="table-container">
          <table class="table is-bordered is-striped is-fullwidth">
            <thead>
              <tr>
                {rows[0]?.map((_, colIndex) => (
                  <th key={colIndex} class="has-text-weight-semibold">
                    Column {colIndex + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((_, rowIndex) => (
                <Row key={rowIndex} rowIndex={rowIndex} />
              ))}
            </tbody>
          </table>
        </div>
        
        <div class="has-text-centered mt-4">
          <button 
            onClick={addRow} 
            class="button is-primary is-outlined"
          >
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
            <span>Add Row</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TablePage() {
  return (
    <section class="section">
      <div class="container">
        <h1 class="title has-text-centered">Optimized Table</h1>
        <OptimizedTable />
      </div>
    </section>
  );
}