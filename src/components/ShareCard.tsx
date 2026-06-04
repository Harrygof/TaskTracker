import { Task } from '../types';

interface ShareCardProps {
  tasks: Task[];
  hasCheckIn: (taskId: string, date: string) => boolean;
  onClose: () => void;
}

export const ShareCard = ({ tasks, hasCheckIn, onClose }: ShareCardProps) => {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dateLabel = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weekNames[now.getDay()]}`;

  const doneCount = tasks.filter(t => hasCheckIn(t.id, today)).length;
  const total = tasks.length;
  const rate = total > 0 ? Math.min(100, Math.round((doneCount / total) * 100)) : 0;
  const allDone = total > 0 && doneCount === total;

  return (
    <div className="share-overlay" onClick={onClose}>
      <div className="share-modal" onClick={e => e.stopPropagation()}>
        <p className="share-hint">↓ 对下方卡片截图后分享 ↓</p>

        <div className="share-card">
          {/* Poster strip */}
          <div className="sc-poster-strip">
            <div className="sc-poster-overlay">
              <span className="sc-brand">⚔ 自由的翅膀</span>
              <span className="sc-date">{dateLabel}</span>
            </div>
          </div>

          {/* Card body */}
          <div className="sc-body">
            <div className="sc-hero">
              <div className="sc-title">今日打卡</div>
              {allDone && <div className="sc-all-done">🎉 今日全部完成！</div>}
            </div>

            <div className="sc-progress-section">
              <div className="sc-progress-meta">
                <span className="sc-progress-label">
                  <span className="sc-count-done">{doneCount}</span>
                  <span className="sc-count-sep"> / {total} 任务完成</span>
                </span>
                <span className="sc-progress-pct">{rate}%</span>
              </div>
              <div className="sc-progress-track">
                <div className="sc-progress-fill" style={{ width: `${rate}%` }} />
              </div>
            </div>

            <div className="sc-gold-divider" />

            <div className="sc-tasks">
              {tasks.length === 0 ? (
                <div className="sc-empty">还没有任务</div>
              ) : tasks.map(task => {
                const done = hasCheckIn(task.id, today);
                return (
                  <div key={task.id} className={`sc-task-row ${done ? 'sc-task-done' : 'sc-task-pending'}`}>
                    <div className="sc-check-icon">
                      {done
                        ? <div className="sc-check-mark">✓</div>
                        : <span className="sc-check-empty" />}
                    </div>
                    <div className="sc-task-label">{task.name}</div>
                    {done && <div className="sc-done-badge">完成</div>}
                  </div>
                );
              })}
            </div>

            <div className="sc-footer">坚持就是胜利 · 每一天都算数</div>
          </div>
        </div>

        <button className="share-close-btn" onClick={onClose}>× 关闭</button>
      </div>
    </div>
  );
};
