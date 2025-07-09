import ProgressBar from './ProgressBar'; 

export default function MangaCard({ manga }) {
  return (
    <div className="card">
      <h2>{manga.title}</h2>
      <p>Progresso: {manga.progress}%</p>
      <ProgressBar progress={manga.progress}/>
    </div>
  );
}
