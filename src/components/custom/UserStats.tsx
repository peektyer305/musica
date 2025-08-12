interface UserStatsProps {
  stats: {
    following: number;
    followers: number;
    posts: number;
  };
  className?: string;
}

export default function UserStats({ stats, className = "" }: UserStatsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  const statItems = [
    { label: 'Following', value: stats.following, key: 'following' },
    { label: 'Followers', value: stats.followers, key: 'followers' },
    { label: 'Posts', value: stats.posts, key: 'posts' },
  ];

  return (
    <div className={`px-4 sm:px-6 lg:px-8 py-3 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex gap-6 sm:gap-8">
        {statItems.map((item) => (
          <button
            key={item.key}
            className="group hover:underline transition-all duration-200"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-gray-900 text-sm sm:text-base">
                {formatNumber(item.value)}
              </span>
              <span className="text-gray-500 text-sm group-hover:text-gray-700">
                {item.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}