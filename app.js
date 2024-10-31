function calculateNutrition() {
    const itemSelect = document.getElementById('item');
    const amountInput = document.getElementById('amount');
    const unitSelect = document.getElementById('unit');
    const resultDiv = document.getElementById('result');

    const selectedItem = itemSelect.value;
    const amount = parseFloat(amountInput.value);
    const selectedUnit = unitSelect.value;

    if (!selectedItem || isNaN(amount) || amount <= 0) {
        resultDiv.textContent = 'Please select a food item and enter a valid amount.';
        return;
    }

    const selectedRow = [...document.querySelectorAll('#nutrition-table tbody tr')]
        .find(row => row.dataset.name === selectedItem);

    const proteinPerServing = parseFloat(selectedRow.dataset.protein);
    const caloriesPerServing = parseFloat(selectedRow.dataset.calories);
    const carbsPerServing = parseFloat(selectedRow.dataset.carbs);
    const fatPerServing = parseFloat(selectedRow.dataset.fat);
    const servingSize = parseFloat(selectedRow.dataset.serving);
    const unit = selectedRow.dataset.unit;

    let servings;

    if (selectedUnit === 'g' && unit === 'g') {
        servings = amount / servingSize;
    } else if (selectedUnit === 'pcs' && unit === 'pcs') {
        servings = amount; // For items measured in pcs, the amount is the serving
    } else if (selectedUnit === 'pcs' && unit === 'g') {
        // Convert pcs to grams for items measured in grams
        servings = amount * (servingSize / (unit === 'g' ? servingSize : 1));
    } else {
        resultDiv.textContent = 'Invalid unit selection.';
        return;
    }

    const totalProtein = (proteinPerServing * servings).toFixed(2);
    const totalCalories = (caloriesPerServing * servings).toFixed(2);
    const totalCarbs = (carbsPerServing * servings).toFixed(2);
    const totalFat = (fatPerServing * servings).toFixed(2);

    // Display result in the desired format
    resultDiv.innerHTML = `
        Calories: ${totalCalories} kcal<br>
        Protein: ${totalProtein} g<br>
        Carbohydrates: ${totalCarbs} g<br>
        Fat: ${totalFat} g
    `;
}
