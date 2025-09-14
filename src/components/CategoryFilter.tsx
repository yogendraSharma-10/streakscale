interface CategoryFilterProps {
  /** The list of available categories to show in the dropdown. */
  categories: string[]
  /** The currently selected category, or an empty string for "All". */
  selectedCategory: string
  /** Called whenever the user picks a new category (empty string = "All"). */
  onChange: (category: string) => void
}

/**
 * A dropdown that lets the user narrow the recipe grid by category.
 * Always includes an "All" option on top of the provided categories.
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <label className="category-filter">
      <span className="category-filter__label">Category</span>
      <select
        className="category-filter__select"
        value={selectedCategory}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Filter recipes by category"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CategoryFilter
