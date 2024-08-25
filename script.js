const arrayContainer = document.getElementById('array-container');
const generateArrayButton = document.getElementById('generateArray');
const sortArrayButton = document.getElementById('sortArray');
const algorithmSelect = document.getElementById('algorithm');
const arraySizeInput = document.getElementById('arraySize');

let array = [];
let delay = 50;

// Function to generate a random array
function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 500) + 1);
    }
    renderArray();
}

// Function to render the array as bars
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${100 / array.length}%`;
        arrayContainer.appendChild(bar);
    });
}

// Swap two elements in the array
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Disable controls during sorting
function disableControls() {
    algorithmSelect.disabled = true;
    generateArrayButton.disabled = true;
    sortArrayButton.disabled = true;
    arraySizeInput.disabled = true;
}

// Enable controls after sorting
function enableControls() {
    algorithmSelect.disabled = false;
    generateArrayButton.disabled = false;
    sortArrayButton.disabled = false;
    arraySizeInput.disabled = false;
}

// Sorting Algorithms
async function bubbleSort() {
    disableControls();
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                renderArray();
                await sleep(delay);
            }
        }
    }
    enableControls();
}

async function selectionSort() {
    disableControls();
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        swap(array, i, minIndex);
        renderArray();
        await sleep(delay);
    }
    enableControls();
}

async function insertionSort() {
    disableControls();
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            renderArray();
            await sleep(delay);
        }
        array[j + 1] = key;
        renderArray();
        await sleep(delay);
    }
    enableControls();
}

async function mergeSort() {
    disableControls();
    await mergeSortHelper(array, 0, array.length - 1);
    enableControls();
}

async function mergeSortHelper(arr, l, r) {
    if (l >= r) {
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = arr.slice(l, l + n1);
    const R = arr.slice(m + 1, m + 1 + n2);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        renderArray();
        await sleep(delay);
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        renderArray();
        await sleep(delay);
    }

    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        renderArray();
        await sleep(delay);
    }
}

async function quickSort() {
    disableControls();
    await quickSortHelper(array, 0, array.length - 1);
    enableControls();
}

async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = (low - 1);
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
            renderArray();
            await sleep(delay);
        }
    }
    swap(arr, i + 1, high);
    renderArray();
    await sleep(delay);
    return i + 1;
}

// Sleep function for delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event Listeners
generateArrayButton.addEventListener('click', () => generateArray(arraySizeInput.value));
sortArrayButton.addEventListener('click', () => {
    const selectedAlgorithm = algorithmSelect.value;
    if (selectedAlgorithm === 'bubble') bubbleSort();
    else if (selectedAlgorithm === 'selection') selectionSort();
    else if (selectedAlgorithm === 'insertion') insertionSort();
    else if (selectedAlgorithm === 'merge') mergeSort();
    else if (selectedAlgorithm === 'quick') quickSort();
});

arraySizeInput.addEventListener('input', () => generateArray(arraySizeInput.value));

// Initialize the array on page load
generateArray(arraySizeInput.value);

// Function to render the array as bars

