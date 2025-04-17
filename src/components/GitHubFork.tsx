interface GitHubForkProps {
  repo: string;
  position?: 'left' | 'right';
}

export const GitHubFork = ({ repo, position = 'right' }: GitHubForkProps) => {
  return (
    <a
      href={`https://github.com/${repo}`}
      className={`github-fork-ribbon ${position}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fork me on GitHub"
    >
      Fork me on GitHub
    </a>
  );
};
