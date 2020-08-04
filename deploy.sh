git pull
cd ..
git commit topic-graph -m 'topic graph tick'
git push
bundle exec cap production deploy
cd topic-graph
