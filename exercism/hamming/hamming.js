class Hamming {
  compute(hamming1, hamming2) {
    if (hamming1.length !== hamming2.length) {
      throw new Error('DNA strands must be of equal length.')
    }
    let similar = 0
    for (let i = 0; i < hamming1.length; i++) {
      if (hamming1[i] !== hamming2[i]) {
      similar += 1

      }
    }
    return similar
  }
}
module.exports = Hamming;
