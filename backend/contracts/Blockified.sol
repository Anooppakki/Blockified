pragma solidity >=0.4.25 <0.6.0;

contract Blockified {
    enum Status {PENDING, VERIFIED, DENIED}

    struct Student {
        uint256 id;
        string name;
        string password;
        mapping(uint256 => uint256) certificates;
        uint256 certificateCount;
    }

    struct Certificate {
        uint256 id;
        string title;
        uint256 student;
        string img;
        Status status;
        uint256 institue;
        string studentName;
    }

    struct Institute {
        uint256 id;
        string name;
        string password;
        string field;
    }

    struct Employer {
        uint256 id;
        string name;
        string password;
        string field;
    }

    mapping(uint256 => Student) public students;
    uint256 public studentsCount = 0;

    mapping(uint256 => Certificate) public certificates;
    uint256 public certificatesCount = 0;

    mapping(uint256 => Institute) public institutes;
    uint256 public institutesCount = 0;

    mapping(uint256 => Employer) public employers;
    uint256 public employersCount = 0;

    function addInstitute(
        string memory _name,
        string memory _password,
        string memory _field
    ) public {
        institutes[institutesCount] = Institute(
            institutesCount,
            _name,
            _password,
            _field
        );
        institutesCount++;
    }

    function addEmployer(
        string memory _name,
        string memory _password,
        string memory _field
    ) public {
        employers[employersCount] = Employer(
            employersCount,
            _name,
            _password,
            _field
        );
        employersCount++;
    }

    function addStudent(string memory _name, string memory _password) public {
        students[studentsCount] = Student({
            id: studentsCount,
            name: _name,
            password: _password,
            certificateCount: 0
        });
        studentsCount++;
    }

    function addCertificate(
        string memory _title,
        uint256 _studentId,
        string memory _img,
        uint256 _institute
    ) public {
        certificates[certificatesCount] = Certificate(
            certificatesCount,
            _title,
            _studentId,
            _img,
            Status.PENDING,
            _institute,
            students[_studentId].name
        );
        students[_studentId].certificates[students[_studentId]
            .certificateCount] = certificatesCount;
        certificatesCount++;
        students[_studentId].certificateCount++;
    }

    function verifyCertificate(uint256 _certificateID) public {
        certificates[_certificateID].status = Status.VERIFIED;
    }

    function rejectCertificate(uint256 _certificateID) public {
        certificates[_certificateID].status = Status.DENIED;
    }

}
