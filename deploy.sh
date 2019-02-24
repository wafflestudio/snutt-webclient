sshpass -p $SSH_PASS rsync -avh ./build/ $RSYNC_DST --delete-after
