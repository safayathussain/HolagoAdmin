import React, { useMemo } from 'react';

// Function to build category tree from flat data
const buildCategoryTree = (categories) => {
    const categoryMap = new Map();

    // Create a map with categories and initialize an empty children array
    categories.forEach(category => {
        categoryMap.set(category.id, { ...category, children: [] });
    });

    const categoryTree = [];

    // Populate the tree structure
    categories.forEach(category => {
        if (category.parentCategory === null) {
            categoryTree.push(categoryMap.get(category.id));
        } else {
            const parent = categoryMap.get(category.parentCategory);
            if (parent) {
                parent.children.push(categoryMap.get(category.id));
            }
        }
    });

    return categoryTree;
};

const Category = ({ categoryIds, setCategoryIds, categoryTab, allCategories }) => {
    // Memoize the tree to avoid unnecessary recalculations
    const nestedCategories = useMemo(() => buildCategoryTree(allCategories), [allCategories]);

    // Helper function to handle checkbox changes
    const handleCheckboxChange = (id) => {
        const updatedCategoryIds = categoryIds.includes(id)
            ? categoryIds.filter(catId => catId !== id)
            : [...categoryIds, id];
        setCategoryIds(updatedCategoryIds);
    };

    // Recursive function to render nested categories
    const renderCategories = (categories, depth = 0) => (
        categories.map(category => (
            <div key={category.id} className={`pl-${depth * 4}`}>
                <div className="flex items-center gap-2 mb-2">
                    <input
                        id={`checkbox-${category.id}`}
                        type="checkbox"
                        checked={categoryIds.includes(category.id)}
                        onChange={() => handleCheckboxChange(category.id)}
                        className="w-4 h-4 bg-gray-500 rounded"
                    />
                    <label htmlFor={`checkbox-${category.id}`} className="font-semibold">{category.categoryName}</label>
                </div>
                {category.children && category.children.length > 0 && renderCategories(category.children, depth + 1)}
            </div>
        ))
    );

    return (
        <div className="p-5 border bg-white rounded-md shadow-md w-full">
            <h5 className="text-md font-bold mb-3">Product Categories</h5>
            <div>
                {renderCategories(nestedCategories)}
            </div>
            {categoryTab === "popular" && (
                <div>Non Found For This Time</div>
            )}
        </div>
    );
};

export default Category;
