#!/bin/bash
cd electron_out
for dir in *; do
  echo "Zipping $dir..."
  zip -r "$dir.zip" $dir > /dev/null
done
echo "Done!"
cd ..
