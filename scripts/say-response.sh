#!/bin/bash
text=$(jq -r '[.message.content[]? | select(.type=="text") | .text] | join(" ")' 2>/dev/null | cut -c1-500)
[ -n "$text" ] && say -v Samantha "$text" &
