export function Filters({ genre = 'all', status = 'all', onGenreChange, onStatusChange }) {
  return (
    <div className="filters">
      <div className="filters__by-genre">
        <label htmlFor="filter-genre">Filtrer par genre :</label>
        <select id="filter-genre" value={genre} onChange={onGenreChange}>
          <option value="all">Tous</option>
          <option value="décolonial">Décolonialisme</option>
          <option value="féminisme">Féminisme</option>
          <option value="militantisme">Militantisme</option>
          <option value="poésie">Poésie</option>
          <option value="histoire">Histoire</option>
          <option value="antiracisme">Antiracisme</option>
          <option value="lgbt">LGBT+</option>
        </select>
      </div>

      <div className="filters__by-status">
        <label htmlFor="filter-status">Filtrer par statut :</label>
        <select id="filter-status" value={status} onChange={onStatusChange}>
          <option value="all">Tous</option>
          <option value="lu">Lu</option>
          <option value="en-cours">En cours</option>
          <option value="a-lire">À lire</option>
        </select>
      </div>
    </div>
  )
}

export default Filters