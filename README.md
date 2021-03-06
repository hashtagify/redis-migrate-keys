Redis Migrate Keys
==================

A node.js script to migrate keys from one Redis instance to onother one.

Installation
------------

Just copy the script in some folder and ensure that the "node_redis" module is available (npm install redis), better if together with hiredis.


Usage
-----

1.   Customize the `redis_from` and `redis_to` variables with the data of your two instances. The "from" instance can have authentication, but the "to" one can't
1.   Customize the `patterns` variable with the patterns you want to migrate. The patterns must be in the form understood by the `keys` redis command
2.   Stop any writing to the data for the duration of the script (you can read though)
1.   Save and launch the script

The script will iterate on each key matched by each pattern and migrate it; this will happen in sequence. Depending on your setup, it could be better to launch more instances of the script, each one with different patterns, to parallelize the execution.

Keep in mind that the `keys` command is blocking and can take a long time, so executing it on a production, live instance, even if read-only, can create performance problems. Two possible solutions are:

*   Create a slave instance of the source, and use that as redis_from
*   If you can't create a new slave, and if it is acceptable to block reading the production instance for some seconds, you can split the pattern in many smaller sub-patterns (eg "patterna*", "patternb*" ... "patternz*")

License
-------

The MIT License (MIT)
Copyright (c) 2013 Daniele Mazzini

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Softwareis furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Donated by [hashtagify.me](http://hashtagify.me/)
