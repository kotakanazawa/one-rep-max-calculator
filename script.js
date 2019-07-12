(function () {
  'use strict';
  const useWeight = document.getElementById('use-weight');
  const reps = document.getElementById('reps');
  const calculateButton = document.getElementById('calculate');
  const resultDivided = document.getElementById('resultDivided');
  const resultUl = document.getElementById('result-ul');

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
    
    // 60~95%RMの計算
    let ary = [];
    for (var i = 0.6; i <= 1; i = i + 0.05) {
      const result = Math.floor((i * oneRepMax)); 
      ary.push(result);
    }

    // 60~95%RMの計算結果を配列に代入
    let list = [];
    for (var i = 60, y = 0; i < 100; i = i + 5, y++) {
      list.push(`<li>${i}%RM: ${ary[y]}kg</li>`);
    }

    // 計算結果表示
    removeAllChildren(resultDivided);
    const paragraphWeight = document.createElement('h2');
    const paragraphRMs = document.createElement('ul');

    paragraphWeight.classList.add('result-h2');
    paragraphRMs.classList.add('result-ul');
    paragraphWeight.innerText = `あなたのマックス重量：${oneRepMax}kg`;
    paragraphRMs.innerHTML = list.join('');
    
    resultDivided.appendChild(paragraphWeight);
    resultDivided.appendChild(paragraphRMs);
    }
  }

  useWeight.focus();
})();
