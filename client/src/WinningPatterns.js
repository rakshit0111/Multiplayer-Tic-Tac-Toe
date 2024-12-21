export const Patterns = [
    // Horizontal Wins
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
  
    // Vertical Wins
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
  
    // Diagonal Wins
    [0, 4, 8], // Top-left to bottom-right
    [2, 4, 6]  // Top-right to bottom-left
  ];
  