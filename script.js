(function () {
  'use strict';

  const useWeight = document.getElementById('use-weight');
  const reps = document.getElementById('reps');
  const calculateButton = document.getElementById('calculate');
  const resultDivided = document.getElementById('resultDivided');
  const ary = [];
  const rmPercent = [0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];

  // 子要素がある限り削除
  function removeAllChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  calculateButton.onclick = () => {
    const weight = useWeight.value;
    const rep = reps.value;

    if (weight === '' || rep === '') {
      return;
    } else {
    // 1RM = w * (36/(37-r));
    const oneRepMax = Math.floor(weight * (1 + rep/40));
    
    // 95~60%RMの計算
    for (var i = 0.6; i <= 1; i = i + 0.05) {
      const result = Math.floor((i * oneRepMax)); 
      ary.push(result);
    }

    var list = [];
    for(var i = 60, y = 0; i < 100; i = i + 5, y++) {
      list.push(`<li>${i}%RM: ${ary[y]}</li>`);
    } 

    // 計算結果表示
    removeAllChildren(resultDivided);
    const header = document.createElement('h2');
    const paragraphWeight = document.createElement('p');
    const paragraphRMs = document.createElement('p');

    header.innerText = '結果';
    paragraphWeight.innerText = `1RM(100%RM):${oneRepMax}kg`;
    paragraphRMs.innerHTML = list.join('');

    resultDivided.appendChild(header);
    resultDivided.appendChild(paragraphWeight);
    resultDivided.appendChild(paragraphRMs);
  }
}
})();
