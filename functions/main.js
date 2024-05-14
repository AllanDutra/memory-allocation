//Best-fit busca o bloco de memória mais próximo do tamanho necessário para alocar um processo.
function bestFit(memoria, processos) {
    let memoriaDisponivel = [...memoria];
    let alocacoes = {}; //alocação da memória

    processos.forEach(processo => {
        let melhorIndex = -1;
        let melhorTamanho = Infinity;

        for (let i = 0; i < memoriaDisponivel.length; i++) {
            if (memoriaDisponivel[i] >= processo) {
                if (memoriaDisponivel[i] < melhorTamanho) {
                    melhorIndex = i;
                    melhorTamanho = memoriaDisponivel[i];
                }
            }
        }

        if (melhorIndex !== -1) {
            alocacoes[processo] = melhorIndex;
            memoriaDisponivel[melhorIndex] -= processo;
        } else {
            alocacoes[processo] = -1;
        }
    });

    return alocacoes;
}

const memoria = [100, 50, 200, 70, 150];
const processos = [20, 80, 10, 30, 60]; 

const alocacoes = bestFit(memoria, processos);
console.log(alocacoes);