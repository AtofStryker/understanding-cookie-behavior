#### Valid Urls based on /etc/hosts

http://app.testme.com:3500/
http://app.testme.com:3501/
https://app.testme.com:3502/ ( might need to type `thisisunsafe` on the denial page due to invalid cert)
https://app.testme.com:3503/ ( might need to type `thisisunsafe` on the denial page due to invalid cert)

http://www.testme.com:3500/
http://www.testme.com:3501/
https://www.testme.com:3502/ ( might need to type `thisisunsafe` on the denial page due to invalid cert)
https://www.testme.com:3503/ ( might need to type `thisisunsafe` on the denial page due to invalid cert)

http://localhost:3500
http://localhost:3501
https://localhost:3502/ (might need to enable `chrome://flags/#allow-insecure-localhost`)
https://localhost:3503/

Also might need to run chrome with the --ignore-certificate-errors flag