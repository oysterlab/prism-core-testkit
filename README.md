# Prsim Core Test Kit
- Sketch에서 작업된 Flux 컴포넌트에서 메타 데이터 추출 테스트
- 추출된 컴포넌트 메타 데이터 -> Tizen NUI Code 생성 테스트 (TBD)
- 생성된 Tizen NUI Code 빌드 -> 세트 탑재 (TBD)

## Install
```
npm install
```

## Usage
```src/index.ts``` 참고

### 새 컴포넌트 정의
```src/components/CImageBox01.ts``` 참고

- ```components```에 ```Component``` 상속 받아 클래스 정의
- ```alias``` 멤버 변수 정의 필수 (컴포넌트 이름)
- ```prepareProperties()``` 정의 필수 (프로퍼티 이름, 추출 방식 구현)


### Run
```
npm run start
```


