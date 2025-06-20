import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Form,
  Input,
  Select,
  Radio,
  Switch,
  Divider,
  Row,
  Col,
  Typography,
} from "antd";
import { transformDepartmentsFilterData } from "@/utils/transfromData/transformFilters";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { transfromCountryFilter } from "@/utils/transfromFilterData/transformInnerFilterLocations";
import { DepartemtIdHelper } from "@/utils/helper/LocationDepartmentIdHelper";
import { addUser, getUsers } from "@/store/actions";
import { toast } from "react-toastify";

const { Title } = Typography;

const PermissionTemplate = forwardRef((props: any, ref) => {
  const { formData, email, handleOk, setEmail, setStep } =
    props;
  const { departments, locations } = useAppSelector((store) => store.userData);
  const { profileData } = useAppSelector((store) => store?.profile);

  const [role, setRole] = useState("c-suite");
  const [access, setAccess] = useState("role-access");
  const [permissions, setPermissions] = useState({
    globalViews: true,
    performance: false,
    financialImpact: false,
    predictiveAnalytics: false,
    engagement: true,
    biReporting: true,
    saveReports: false,
    fileReports: false,
    accessAllReports: false,
    assignReports: false,
    retentionRate: false,
    firstYearRetentionRate: false,
    internalMobilityRate: false,
    getTurnoverRate: false,
    absenteeism: false,
    cost: false,
    costOfVacancy: false,
    turnoverCosts: false,
    absenteeismCost: false,
  });

  const handleSwitchChange = (key: string, value: boolean) => {
    setPermissions({ ...permissions, [key]: value });
  };

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [department, setDepartment] = useState<any>();
  const [departmentId, setDepartmentId] = useState<any>();
  const [location, setLocation] = useState<any>();
  const [locationCode, setLocationCode] = useState<any>();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    location: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      position: '',
      department: '',
      location: ''
    };

    if (!firstName?.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!position?.trim()) {
      newErrors.position = 'Position is required';
      isValid = false;
    }

    if (!department) {
      newErrors.department = 'Department is required';
      isValid = false;
    }

    if (!location) {
      newErrors.location = 'Country is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const setDeaprtmentFunction = async() => {
      const id = await (DepartemtIdHelper(departments, department));
      setDepartmentId( id);
    }

    setDeaprtmentFunction();
    
    console.log("departmentId", department,departmentId);
  }, [department, departments,departmentId]);

  useEffect(() => {
    type LocationType = { country_name: string; country_code: string };
    const countryCode = (locations as LocationType[]).find(
      (item) => item?.country_name === location && item?.country_code !== null
    );
    // console.log("country code", countryCode?.country_code, location);
    setLocationCode(countryCode?.country_code);
  }, [location]);

  const departmentsList = useMemo(
    () =>
      Array.isArray(departments)
        ? transformDepartmentsFilterData(departments)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [departments]
  );

  const transformedLocations = useMemo(
    () =>
      Array.isArray(locations)
        ? transfromCountryFilter(locations)
        : { data: [], companyAverage: "0%", predictedValue: "0%" },
    [locations]
  );

  const dispatch = useAppDispatch();

  const resetAll = () => {
    // Reset all form-related state
    setFirstName("");
    setLastName("");
    setPosition("");
    setDepartment(null);
    setDepartmentId(null);
    setLocation(null);
    setLocationCode(null);
    setRole("c-suite");
    setAccess("role-access");
    setPermissions({
      globalViews: true,
      performance: false,
      financialImpact: false,
      predictiveAnalytics: false,
      engagement: true,
      biReporting: true,
      saveReports: false,
      fileReports: false,
      accessAllReports: false,
      assignReports: false,
      retentionRate: false,
      firstYearRetentionRate: false,
      internalMobilityRate: false,
      getTurnoverRate: false,
      absenteeism: false,
      cost: false,
      costOfVacancy: false,
      turnoverCosts: false,
      absenteeismCost: false,
    });
    setEmail("");
    setStep(1);
  };

  const handleNextClick = async () => {
    if (!validateForm()) {
      return;
    }

    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("position", position);
    formData.append("department", department);
    formData.append("department_id", (departmentId.toString()));
    formData.append("country", (locationCode.toString()));
    formData.append("roles", role);
    formData.append("access", access);
    formData.append(
      "permission_template[c-suit][access_to_view_globally]",
      permissions?.globalViews ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][access_to_perform]",
      permissions?.performance ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][financial_impact]",
      permissions?.financialImpact ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][predictive_analytics]",
      permissions?.predictiveAnalytics ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][engagement]",
      permissions?.engagement ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][bi_reporting][save_reports]",
      permissions?.saveReports ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][bi_reporting][file_reports_in_folder]",
      permissions?.fileReports ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][bi_reporting][assign_reports_to_users]",
      permissions?.assignReports ? "1" : "0"
    );
    formData.append(
      "permission_template[c-suit][bi_reporting][access_to]",
      permissions?.accessAllReports ? "1" : "0"
    );
    formData.append("organization_id", profileData?.["organization"]?.["id"]);

    const action = await dispatch<any>(addUser(formData));
    console.log(action);

    if (action?.payload?.message === "User Added Successfully") {
      // setNotificationProps({
      //   visible: true,
      //   type: "success",
      //   title: "Success",
      //   message: action?.payload?.message,
      // });
      toast.success(action?.payload?.message)
      handleOk();
      dispatch(
        getUsers({ organization_id: profileData?.["organization"]?.["id"] })
      );
    } else {
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: `User not added successfully. ${action?.payload?.message}`,
      // });
      toast.error(`User not added successfully. ${action?.payload?.message}`)
      handleOk();
    }

    resetAll();
  };

  useImperativeHandle(ref, () => ({
    handleNextClick,
    resetAll
  }));

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              className="font-[400] text-[14px]" 
              label="First name"
              validateStatus={errors.firstName ? 'error' : ''}
              help={errors.firstName}
            >
              <Input
                className="font-[400] text-[16px]"
                placeholder="First Name"
                onChange={(e: any) => {
                  setFirstName(e.target.value);
                  setErrors(prev => ({ ...prev, firstName: '' }));
                }}
                value={firstName}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              className="font-[400] text-[14px]" 
              label="Surname"
              validateStatus={errors.lastName ? 'error' : ''}
              help={errors.lastName}
            >
              <Input
                className="font-[400] text-[16px]"
                placeholder="Doe"
                onChange={(e: any) => {
                  setLastName(e.target.value);
                  setErrors(prev => ({ ...prev, lastName: '' }));
                }}
                value={lastName}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              className="font-[400] text-[14px]" 
              label="Position"
              validateStatus={errors.position ? 'error' : ''}
              help={errors.position}
            >
              <Input
                className="font-[400] text-[16px]"
                placeholder="Enter position"
                onChange={(e: any) => {
                  setPosition(e.target.value);
                  setErrors(prev => ({ ...prev, position: '' }));
                }}
                value={position}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              className="font-[400] text-[14px]" 
              label="Department"
              validateStatus={errors.department ? 'error' : ''}
              help={errors.department}
            >
              <Select
                className="font-[400] text-[16px]"
                placeholder="Select department"
                options={departmentsList?.data?.map((items: any) => ({
                  value: items.label,
                  label: items.label,
                }))}
                onChange={(value: string) => {
                  setDepartment(value);
                  setErrors(prev => ({ ...prev, department: '' }));
                }}
                value={department}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          className="font-[400] text-[14px]" 
          label="Country"
          validateStatus={errors.location ? 'error' : ''}
          help={errors.location}
        >
          <Select
            className="font-[400] text-[16px]"
            placeholder="Select country"
            options={transformedLocations?.data?.map((item: any) => ({
              value: item.label,
              label: item.label,
            }))}
            onChange={(value: any) => {
              setLocation(value);
              setErrors(prev => ({ ...prev, location: '' }));
            }}
            value={location}
          />
        </Form.Item>

        <Title className="font-[700] text-[16px]" level={5}>
          Roles
        </Title>
        <Radio.Group value={role} onChange={(e) => setRole(e.target.value)}>
          <Radio value="c-suite">C-suite</Radio>
          <Radio value="director">Director</Radio>
          <Radio value="line-manager">Line manager</Radio>
        </Radio.Group>

        <Divider />

        <Title className="font-[700] text-[16px]" level={5}>
          Access
        </Title>
        <Radio.Group value={access} onChange={(e) => setAccess(e.target.value)}>
          <Radio value="super-admin">Super Admin</Radio>
          <Radio value="role-access">Role access</Radio>
        </Radio.Group>

        <Divider />

        <Title className="font-[700] text-[16px]" level={5}>
          C-suite
        </Title>
        <Form.Item>
          <Switch
            checked={permissions.globalViews}
            onChange={(checked) => handleSwitchChange("globalViews", checked)}
          />
          <span className="font-[500] text-[14px] ml-[8px]">
            Access to all views globally
          </span>
        </Form.Item>
        <Form.Item>
          <Switch
            checked={permissions.performance}
            onChange={(checked) => handleSwitchChange("performance", checked)}
          />
          <span className="font-[500] text-[14px] ml-[8px]">
            Access to Performance
          </span>
        </Form.Item>

        <Form.Item>
          <Switch
            checked={permissions.financialImpact}
            onChange={(checked) =>
              handleSwitchChange("financialImpact", checked)
            }
          />
          <span className="font-[500] text-[14px] ml-[8px]">
            Access to financial Impact
          </span>
        </Form.Item>

        <Form.Item>
          <Switch
            checked={permissions.predictiveAnalytics}
            onChange={(checked) =>
              handleSwitchChange("predictiveAnalytics", checked)
            }
          />
          <span className="font-[500] text-[14px] ml-[8px]">
            Access to predictive analytics
          </span>
        </Form.Item>
        <Form.Item>
          <Switch
            checked={permissions.engagement}
            onChange={(checked) => handleSwitchChange("engagement", checked)}
          />
          <span className="font-[500] text-[14px] ml-[8px]">Engagement</span>
        </Form.Item>

        <Form.Item>
          <Switch
            checked={permissions.biReporting}
            onChange={(checked) => handleSwitchChange("biReporting", checked)}
          />
          <span className="font-[500] text-[14px] ml-[8px]">BI reporting</span>
        </Form.Item>

        {permissions.biReporting && (
          <div style={{ marginLeft: "38px" }}>
            <Form.Item>
              <Switch
                checked={permissions.saveReports}
                onChange={(checked) =>
                  handleSwitchChange("saveReports", checked)
                }
              />
              <span className="ml-2">
                Save reports in public or private folders
              </span>
            </Form.Item>
            <Form.Item>
              <Switch
                checked={permissions.fileReports}
                onChange={(checked) =>
                  handleSwitchChange("fileReports", checked)
                }
              />
              <span className="ml-2">File reports in folders</span>
            </Form.Item>
            <Form.Item>
              <Switch
                checked={permissions.accessAllReports}
                onChange={(checked) =>
                  handleSwitchChange("accessAllReports", checked)
                }
              />
              <span className="ml-2">Access to all reports globally</span>
            </Form.Item>
            <Form.Item>
              <Switch
                checked={permissions.assignReports}
                onChange={(checked) =>
                  handleSwitchChange("assignReports", checked)
                }
              />
              <span className="ml-2">Assign reports to users</span>
            </Form.Item>
          </div>
        )}
      </Form>
    </div>
  );
});

export default PermissionTemplate;
