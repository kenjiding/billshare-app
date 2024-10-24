App分为两个部分：主租户，租户。

租户需求：
  1、用户注册：
    用户需要下载SplitMate应用。
    上传身份证照片以便用户识别。
  2、用户认证：
    为用户提供登录，注册功能。
    用户人脸识别功能

  3、活动监控：
    显示用户的使用统计数据。
    与安全摄像头和传感器集成，用于追踪电力、水、网络等的使用情况。

  4、账单计算：
    服务器端根据收集的数据计算每个用户的费用分摊。
    显示详细的账单分摊情况以确保透明度。

  5、通知：
    提醒住户支付其分摊的费用。
    实时更新使用情况和账单信息。

主租户：
  1、仪表板功能：
    发起分账
    实时监控所有住户的使用情况
    添加/移除住户
    授权/撤销特定设施的访问权限（如加热器）
  
  2、授权请求：
    主租户可以批准或拒绝租户的授权请求。
    住户可以通过应用请求特定设施的授权。


## UI design

User interface design using figma, Photoshop, including all screen page designs
User Experience Design，
## 1、mobile application (react-native)

Using react, react-native, expo to develop the mobile application for users to view their resource usage

The mobile application will provide the data to the user for display.
Include the following features:
- Distinguishing between manager and tenant
- User login and registration system
- Identity upload, face recognition and verification
- Display resource usage data for each person
- Filter resource usage data by time, location, and person
- Building android and ios apps


## 2、cameras and sensors
  cameras: Monitor who is currently using the resource

  sensors: Monitoring of the usage and consumption of each electrical device

  and then provide the data to the Python service for analysis.


## 3、Python Services (Machine Learning and Image Processing)

Python receives the data from cameras and sensors to analyze each person's resource usage by using machine learning and image processing algorithms.
and then provide the data to the back-end for record and filter.


## 4、back-end
The Python service provides data to the backend and uses a database and API to record each person's resource usage.
and it will provide the data to the mobile application for display.

Include the following features:
- Distinguishing between manager and tenant
- Record resource usage data for each person
- Filter resource usage data by time, location, and person
- Provide login and registration system for users
- Provide resource usage data to mobile application for display


## 5、 cloud service
Deploy python services and backend services to aws cloud for scalable and highly available services
Include the following tools:
- AWS EC2
- docker
- docker-compose
- nginx
- ssh
- git action（CI/CD）


