var redis_from = {
  hostname:   'host1',
  port: 6379,
  // set auth: null if no authentication is required
  auth: "password"
};
 
// redis_to can't have authentication (it's not supported by the migrate redis command)
var redis_to = {
    hostname:   'host2',
    port: 6379
};
 
// add here the patterns for the keys you want to migrate from redis_from to redis_to
var patterns = ["pattern1*","pattern2*"];
 
var sys = require('sys');
 
console.log("starting keys migration"+(new Date()));
 
var redis = require("redis"),
    client = redis.createClient(redis_from.port,redis_from.hostname);
 
if (redis_from.auth) client.auth(redis_from.auth);
 
client.on("error", function (err) {
    console.log("Error " + err);
});
 
var g_keys;
var g_last_n;
 
function migrate(f) {
  if (g_keys.length == 0) return f();  
 
  key = g_keys.pop();
  len = g_keys.length;
 
  if (g_last_n - len > 5000) {
    console.log(new Date()+" : "+len);
    g_last_n = len;
  }
 
  client.migrate([redis_to.hostname,redis_to.port,key,'0','1000'], function(){
    migrate(f);
  });
}
 
function migrate_keys(patterns_array) {
    if (patterns_array.length == 0) exit();
 
    pattern = patterns_array.pop();
 
    console.log("going to migrate: "+pattern);
 
    client.keys(pattern, function (err, keys) {
        if (err) return console.log("error: "+err);
        else console.log('keys found: '+keys.length);
 
      g_keys = keys;
        g_last_n = keys.length;
 
        migrate(function(){
            migrate_keys(patterns_array);
        });
    });
}
 
migrate_keys(patterns);
